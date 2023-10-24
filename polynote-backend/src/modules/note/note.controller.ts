import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ethers } from 'ethers';
import { Request } from 'express';
import { CONFIG } from 'src/config';
import {
  NotesCreateDto,
  NotesIdParam,
  NotesParams,
  NotesResponseData,
  NotesSharedParam,
  NotesUpdateDto,
  NotesUpdateParams,
} from 'src/modules/note/note.dto';
import { NoteService } from 'src/modules/note/note.service';
import { POLYNOTE_ABI } from 'src/utils/abi';
import { getTokenData } from 'src/utils/getTokenData';
import { verifyR1Signature } from 'src/utils/verifyR1Signature';
import { Provider } from 'zksync-web3';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('/:address')
  @ApiOperation({ summary: 'Get notes of a user with address' })
  @ApiResponse({
    type: NotesResponseData,
    isArray: true,
  })
  public async getNotesForUser(
    @Param() params: NotesParams,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (params.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.noteService.genNotesForUser(params.address);
  }

  @Get('/id/:id')
  @ApiResponse({
    type: NotesResponseData,
  })
  @ApiOperation({ summary: 'Get note with an ID' })
  public async genNote(@Param() params: NotesIdParam) {
    return await this.noteService.genNoteById(params.id);
  }

  @Post('/:id')
  @ApiResponse({
    type: NotesResponseData,
  })
  @ApiOperation({ summary: 'Update note' })
  public async syncNote(
    @Param() params: NotesUpdateParams,
    @Req() req: Request,
    @Body() noteUpdateDto: NotesUpdateDto,
  ) {
    const { address } = getTokenData(req);

    const note = await this.noteService.genNoteById(params.id);

    if (note == null) {
      throw new HttpException('Note does not exist', HttpStatus.NOT_FOUND);
    }

    if (note.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.noteService.updateNote(params.id, noteUpdateDto);
  }

  @Post()
  @ApiResponse({
    type: NotesResponseData,
  })
  @ApiOperation({ summary: 'Create a new note' })
  public async createNote(
    @Body() notesCreateDto: NotesCreateDto,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (notesCreateDto.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.noteService.createNote(notesCreateDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a note' })
  public async deleteNote(@Param() param: NotesIdParam, @Req() req: Request) {
    const { address } = getTokenData(req);

    const note = await this.noteService.genNoteById(param.id);

    if (note == null) {
      throw new HttpException('Note does not exist', HttpStatus.NOT_FOUND);
    }

    if (address !== note.address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.noteService.deleteNoteById(param.id);
  }

  @Post('/shared/:id')
  @ApiResponse({
    type: NotesResponseData,
  })
  @ApiOperation({ summary: 'Get shared note with signature' })
  public async getSharedNote(
    @Param() param: NotesIdParam,
    @Body() sharedNoteParam: NotesSharedParam,
  ) {
    await verifyR1Signature(
      'See shared note',
      sharedNoteParam.signature,
      sharedNoteParam.address,
    );

    const contract = new ethers.Contract(
      CONFIG.POLYNOTE_CONTRACT,
      POLYNOTE_ABI,
      new Provider(process.env.NETWORK_RPC_URL),
    );

    const note = await this.noteService.genDecryptedNoteById(param.id);
    const isShared = await contract.isShared(
      note.address,
      param.id,
      sharedNoteParam.address,
    );

    if (note == null) {
      throw new HttpException('Note does not exist', HttpStatus.NOT_FOUND);
    }

    if (isShared !== true) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return note;
  }
}
