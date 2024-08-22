package com.alby.hotelservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoomsResponseDto {
    private List<RoomDto> roomDtoList;
    private Integer totalPage;
    private Integer pageNumber;
}
