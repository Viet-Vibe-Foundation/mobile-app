import { Request, Response } from "express";
import { handleException } from "../exceptions/handleException";
import { prisma } from "../libs/db";
import { EventDTO } from "../dtos/eventDTO";
import { ResponseDTO } from "../types/responseDTO";
import MissingFieldValue from "../types/exceptions/missingFieldValue";

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

const getEventById = async (
  req: Request<{ eventId: string }>,
  res: Response
) => {
  try {
    const { eventId } = req.params;

    if (!eventId) throw new MissingFieldValue("eventId");

    const event = await prisma.event.findUnique({
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        startDate: true,
        startTime: true,
        imgUrl: true,
        endTime: true,
        formLink: true,
        User: {
          select: {
            name: true,
          },
        },
        EventSchedule: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
            description: true,
          },
        },
      },
      where: {
        id: eventId,
      },
    });

    const result: EventDTO = {
      id: event?.id,
      title: event?.title,
      description: event?.description,
      location: event?.location,
      startDate: event?.startDate,
      imgUrl: event?.imgUrl,
      startTime: event?.startTime,
      endTime: event?.endTime,
      formLink: event?.formLink,
      eventSchedules: event?.EventSchedule.map((item) => ({
        description: item.description,
        endTime: item.endTime,
        id: item.id,
        starTime: item.startTime,
      })),
    };

    res.status(200).json({
      message: "Fetch event by id",
      success: true,
      data: result,
    } as ResponseDTO<EventDTO>);
  } catch (error) {
    handleException(error, res);
  }
};

export default { getEvents, getEventById };
