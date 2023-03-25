import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CONFIG } from 'src/config';
import { MB } from 'src/utils/numbers';
import { File, Web3Storage } from 'web3.storage';

@Injectable()
export class UploadService {
  client: Web3Storage;
  rootURL: string;

  constructor() {
    this.client = new Web3Storage({
      token: CONFIG.WEB3_STORAGE_TOKEN,
    });
    this.rootURL = 'https://dweb.link/ipfs';
  }

  public async uploadImage(file: Express.Multer.File) {
    const allowedFileTypes = ['png', 'jpg', 'jpeg', 'svg'];

    const fileSizeInMB = file.size / MB;
    if (fileSizeInMB > 2) {
      throw new HttpException(
        'File size cannot be larger than 2MB',
        HttpStatus.BAD_REQUEST,
      );
    }

    const filename = file.originalname || file.filename;
    const extension = filename.split('.').pop();

    if (!allowedFileTypes.includes(extension)) {
      throw new HttpException(
        'You can only upload an image',
        HttpStatus.BAD_REQUEST,
      );
    }

    const blob = new Blob([file.buffer]);
    const _file = new File([blob], filename);
    const cid = await this.client.put([_file]);
    const url = this.formatWeb3StorageUrl(cid, filename);
    return url;
  }

  formatWeb3StorageUrl(cid: number | string, fileName: string) {
    return `${this.rootURL}/${cid}/${fileName}`;
  }
}
