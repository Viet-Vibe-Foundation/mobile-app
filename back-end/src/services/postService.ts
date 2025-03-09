import { Request, Response } from "express";
import { ResponseDTO } from "../types/responseDTO";
import { prisma } from "../libs/db";
import { PostDTO } from "../dtos/postDTO";
import { handleException } from "../exceptions/handleException";
import MissingFieldValue from "../types/exceptions/missingFieldValue";
import NotFoundException from "../types/exceptions/notFoundException";
import { Post } from "@prisma/client";

const getPosts = async (req: Request, res: Response) => {
  try {
    const { pageNum, pageSize } = req.query;

    const page = pageNum ? Number(pageNum) : 1;
    const size = pageSize ? Number(pageSize) : 4;

    const totalCount = await prisma.post.count();

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        imgUrl: true,
        isPublished: true,
        content: true,
        summary: true,
        _count: {
          select: { postLikes: true, postVisits: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * size,
      take: size,
    });

    // const postDtos = posts.map<PostDTO>((item) => ({
    //   id: item.id,
    //   title: item.title,
    //   createdAt: item.createdAt,
    //   totalLikes: item._count.postLikes,
    //   totalVisits: item._count.postVisits,
    //   updatedAt: item.updatedAt,
    //   userId: item.userId,
    //   imgUrl: item.imgUrl,
    //   content: item.content,
    //   isPublished: item.isPublished,
    //   sumary: item.summary,
    // }));

    // const result: ResponseDTO<Post[]> = {
    //   data: posts,
    //   total: totalCount,
    //   pageNum: page,
    //   pageSize: size,
    //   success: true,
    //   message: "Posts fetched successfully",
    // };

    res.json(posts);
  } catch (err) {
    handleException(err, res);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      throw new MissingFieldValue("PostId");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    if (!post) {
      throw new NotFoundException("Post");
    }

    const result: PostDTO = {
      id: post.id,
      authorName: post.user?.name ?? "N/A",
      createdAt: post.createdAt,
      title: post.title,
      content: post.content,
      updatedAt: post.updatedAt,
    };
    res.json(result);
  } catch (error) {
    handleException(error, res);
  }
};

export default { getPosts, getPostById };
