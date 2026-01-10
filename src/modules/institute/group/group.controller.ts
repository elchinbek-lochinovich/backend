import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('departmentId') departmentId?: string) {
    return this.service.findAll(
      departmentId ? Number(departmentId) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGroupDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
