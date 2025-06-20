#!/bin/bash

set -e

### LOGGING COLORS ###
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

### CONFIG ###
BUILD_GRADLE_FILE="android/app/build.gradle"
BACKUP_FILE="${BUILD_GRADLE_FILE}.bak"

### DETECT OS ###
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     OS_TYPE="linux";;
    Darwin*)    OS_TYPE="macos";;
    CYGWIN*|MINGW*|MSYS*) OS_TYPE="windows";;
    *)          OS_TYPE="unknown";;
esac

### HELP FUNCTION ###
print_help() {
  echo -e "${CYAN}"
  echo "Usage: $0 [options]"
  echo
  echo "Options:"
  echo "  --patch       Bump patch version (default)"
  echo "  --minor       Bump minor version"
  echo "  --major       Bump major version"
  echo "  --commit      Auto commit changes to Git"
  echo "  --help        Show this help message"
  echo
  echo "Examples:"
  echo "  $0 --patch"
  echo "  $0 --minor --commit"
  echo "  $0 --major"
  echo -e "${NC}"
}

### ARGUMENT PARSING ###
BUMP_TYPE="patch"
GIT_COMMIT="false"

while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
      --patch)
      BUMP_TYPE="patch"
      shift ;;
      --minor)
      BUMP_TYPE="minor"
      shift ;;
      --major)
      BUMP_TYPE="major"
      shift ;;
      --commit)
      GIT_COMMIT="true"
      shift ;;
      --help)
      print_help
      exit 0 ;;
      *)
      echo -e "${RED}❌ Unknown option: $1${NC}"
      print_help
      exit 1 ;;
  esac
done

echo -e "${CYAN}Detected OS: $OS_TYPE${NC}"
echo -e "${CYAN}Bump type: $BUMP_TYPE${NC}"

### CHECK FILE ###
if [ ! -f "$BUILD_GRADLE_FILE" ]; then
  echo -e "${RED}❌ ERROR: build.gradle not found at $BUILD_GRADLE_FILE${NC}"
  exit 1
fi

### BACKUP ###
cp "$BUILD_GRADLE_FILE" "$BACKUP_FILE"
echo -e "${GREEN}✅ Backup created: $BACKUP_FILE${NC}"

### ROLLBACK FUNCTION ###
rollback() {
  echo -e "${RED}⚠️ Error occurred, rolling back changes...${NC}"
  cp "$BACKUP_FILE" "$BUILD_GRADLE_FILE"
  echo -e "${GREEN}✅ File restored from backup.${NC}"
  exit 1
}

# Trap toàn bộ lỗi
trap rollback ERR

### READ CURRENT VERSION ###
VERSION_CODE_LINE=$(grep "versionCode" "$BUILD_GRADLE_FILE" | head -n 1)
CURRENT_VERSION_CODE=$(echo "$VERSION_CODE_LINE" | awk '{print $2}' | tr -d '[:space:]')
echo -e "${GREEN}Current versionCode: $CURRENT_VERSION_CODE${NC}"

VERSION_NAME_LINE=$(grep "versionName" "$BUILD_GRADLE_FILE" | head -n 1)
CURRENT_VERSION_NAME=$(echo "$VERSION_NAME_LINE" | awk -F\" '{print $2}' | tr -d '[:space:]')
echo -e "${GREEN}Current versionName: $CURRENT_VERSION_NAME${NC}"

IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION_NAME"

### BUMP LOGIC ###
case $BUMP_TYPE in
    patch)
        PATCH=$((PATCH + 1))
        ;;
    minor)
        MINOR=$((MINOR + 1))
        PATCH=0
        ;;
    major)
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        ;;
esac

NEW_VERSION_NAME="${MAJOR}.${MINOR}.${PATCH}"
NEW_VERSION_CODE=$((CURRENT_VERSION_CODE + 1))

echo -e "${YELLOW}New versionCode: $NEW_VERSION_CODE${NC}"
echo -e "${YELLOW}New versionName: $NEW_VERSION_NAME${NC}"

### UPDATE FILE ###
if [[ "$OS_TYPE" == "macos" ]]; then
  sed -i '' "s/versionCode $CURRENT_VERSION_CODE/versionCode $NEW_VERSION_CODE/" "$BUILD_GRADLE_FILE"
  sed -i '' "s/versionName \"$CURRENT_VERSION_NAME\"/versionName \"$NEW_VERSION_NAME\"/" "$BUILD_GRADLE_FILE"
else
  sed -i "s/versionCode $CURRENT_VERSION_CODE/versionCode $NEW_VERSION_CODE/" "$BUILD_GRADLE_FILE"
  sed -i "s/versionName \"$CURRENT_VERSION_NAME\"/versionName \"$NEW_VERSION_NAME\"/" "$BUILD_GRADLE_FILE"
fi

echo -e "${GREEN}✅ Updated build.gradle successfully.${NC}"

### GIT COMMIT (OPTIONAL) ###
if [[ "$GIT_COMMIT" == "true" ]]; then
  if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    git add "$BUILD_GRADLE_FILE"
    git commit -m "Bump to versionCode $NEW_VERSION_CODE, versionName $NEW_VERSION_NAME"
    echo -e "${GREEN}✅ Git commit created.${NC}"
  else
    echo -e "${RED}⚠️ Not inside a git repository, skipping commit.${NC}"
  fi
fi

### PRE-BUILD: GENERATE VECTOR IMAGES ###
if [ -f "node_modules/.bin/react-native-vector-image" ]; then
  echo -e "${CYAN}🎨 Regenerating vector images...${NC}"
  npx react-native-vector-image generate
fi

### CLEAN & BUILD ###
chmod +x android/gradlew
cd android

echo -e "${CYAN}🔧 Clean Android build...${NC}"
./gradlew clean

echo -e "${CYAN}📦 Build Android AAB bundle...${NC}"
./gradlew bundleRelease

cd ..

### CLEANUP BACKUP AFTER SUCCESS ###
rm -f "$BACKUP_FILE"
echo -e "${GREEN}✅ Build completed successfully. Backup file removed.${NC}"

echo -e "${CYAN}🎉 All steps completed successfully!${NC}"
