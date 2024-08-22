package com.alby.hotelservice.service;

import com.alby.hotelservice.dto.RoomDto;
import com.alby.hotelservice.dto.RoomsResponseDto;

public interface RoomService {
    boolean addRoom(RoomDto roomDto);
    RoomsResponseDto getAllRooms(int pageNumber);
    RoomDto getRoom(Long id);
    Boolean updateRoom (Long id, RoomDto roomDto);
    void deleteRoom(Long id);
    RoomsResponseDto availableRooms (int pageNumber);
}
