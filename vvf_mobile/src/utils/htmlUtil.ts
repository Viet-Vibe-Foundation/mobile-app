const htmlContent = (remoteBody: string, fontColor: string) => `
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
            body {
                font-family: 'System', sans-serif;
                font-size: 16px;
                padding: 10px;
                margin: 0;
                line-height: 1.5;
                color: ${fontColor};
            }

            h1 {
                font-weight: bold;
                font-size: 22px;
                margin: 16px 0 8px;
                color:${fontColor}
            }

            h2 {
              font-weight: semi-bold;
              font-size: 18px;
              color:${fontColor}
            }

            p {
                margin: 12px;
                font-size: 16px;
                color:${fontColor}
            }

            ol, li {
              margin: 0
            }

            ol li span {
              color:${fontColor}
            }

            img {
                max-width: 100%;
                height: auto;
                display: block;
                margin: 8px 0;
                border-radius: 8px;
            }

            strong {
                font-weight: bold;
            }

            a {
                color: #1e90ff;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }
        </style>
      </head>
      <body>
        ${remoteBody}
      </body>
    </html>
  `;

const normalizeHTML = (content: string) => {
  return (
    content
      .replace(/\s?class="[^"]*(ql-font-[^"\s]+)[^"]*"/g, '')
      .replace(/\s?class="[^"]*(ql-size-[^"\s]+)[^"]*"/g, '')
      .replace(/\s?class="[^"]*ql-[^"]*"/g, '')
      // Remove class=""
      .replace(/\sclass=""/g, '')
      // Normalize empty paragraphs
      .replace(/<p><br\s?\/?><\/p>/g, '<br/>')
      // Remove inline color styles
      .replace(/\sstyle="[^"]*color\s*:\s*[^;"]+;?[^"]*"/gi, '')
  );
};

export {htmlContent, normalizeHTML};
