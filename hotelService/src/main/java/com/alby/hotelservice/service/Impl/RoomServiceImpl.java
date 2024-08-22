package com.alby.hotelservice.service.Impl;

import com.alby.hotelservice.dto.RoomDto;
import com.alby.hotelservice.dto.RoomsResponseDto;
import com.alby.hotelservice.entity.Room;
import com.alby.hotelservice.repository.RoomRepository;
import com.alby.hotelservice.service.RoomService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public boolean addRoom(RoomDto roomDto) {
        try{
            Room room = new Room();
            room.setName(roomDto.getName());
            room.setType(roomDto.getType());
            room.setAvailable(true);
            room.setPrice(roomDto.getPrice());
            roomRepository.save(room);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    @Override
    public RoomsResponseDto getAllRooms(int pageNumber) {
        Pageable pageable =  PageRequest.of(pageNumber, 6);
        Page<Room> roomPage= roomRepository.findAll(pageable);
        RoomsResponseDto roomsResponseDto = new RoomsResponseDto();
        roomsResponseDto.setPageNumber(roomPage.getPageable().getPageNumber());
        roomsResponseDto.setTotalPage(roomPage.getTotalPages());
        roomsResponseDto.setRoomDtoList(roomPage.stream().map(Room :: getRoomDto).collect(Collectors.toList()));
        return roomsResponseDto;
    }

    @Override
    public RoomDto getRoom(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        if(room.isPresent()){
            return room.get().getRoomDto();
        }
        else {
            throw new EntityNotFoundException("Room not found");
        }
    }

    @Override
    public Boolean updateRoom(Long id, RoomDto roomDto) {
        Optional<Room> room = roomRepository.findById(id);
        if(room.isPresent()){
            Room existingRoom = room.get();
            existingRoom.setName(roomDto.getName());
            existingRoom.setType(roomDto.getType());
            existingRoom.setPrice(roomDto.getPrice());
            roomRepository.save(existingRoom);
            return true;
        }
        return false;
    }

    @Override
    public void deleteRoom(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        if(room.isPresent()){
            roomRepository.delete(room.get());
        }else{
            throw new EntityNotFoundException("Room not found");
        }
    }

    @Override
    public RoomsResponseDto availableRooms(int pageNumber) {
        Pageable pageable =  PageRequest.of(pageNumber, 6);
        Page<Room> roomPage= roomRepository.findByAvailable(true, pageable);
        RoomsResponseDto roomsResponseDto = new RoomsResponseDto();
        roomsResponseDto.setPageNumber(roomPage.getPageable().getPageNumber());
        roomsResponseDto.setTotalPage(roomPage.getTotalPages());
        roomsResponseDto.setRoomDtoList(roomPage.stream().map(Room :: getRoomDto).collect(Collectors.toList()));
        return roomsResponseDto;
    }
}
