import { Request, Response } from "express";
import { handleException } from "../exceptions/handleException";
import { prisma } from "../libs/db";
import { EventDTO } from "../dtos/eventDTO";
import { ResponseDTO } from "../types/responseDTO";

const getEvents = async (req: Request, res: Response) => {
  try {
    const { pageNum, pageSize } = req.query;

    const page = pageNum ? Number(pageNum) : 1;
    const size = pageSize ? Number(pageSize) : 4;

    const totalEventCount = await prisma.event.count();

    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        location: true,
        price: true,
        startDate: true,
        startTime: true,
        imgUrl: true,
        isPublished: true,
        eventType: true,
        capacity: true,
        ticketsSold: true,

        days: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * size,
      take: size,
    });

    const eventDtos: EventDTO[] = events.map((item) => ({
      id: item.id,
      title: item.title,
      location: item.location,
      price: item.price,
      startTime: item.startTime,
      startDate: item.startDate,
      imgUrl: item.imgUrl,
      isPublished: item.isPublished,
      eventType: item.eventType,
      days: item.days,
      remainingTicket: Math.max(
        0,
        (item.capacity ?? 0) - (item.ticketsSold ?? 0)
      ),
    }));

    const result: ResponseDTO<EventDTO[]> = {
      data: eventDtos,
      total: totalEventCount,
      pageNum: page,
      pageSize: size,
      success: true,
      message: "Events fetched successfully",
    };

    res.status(200).json(result);
  } catch (err) {
    handleException(err, res);
  }
};

export default { getEvents };
