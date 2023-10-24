import { JsonRpcProvider } from '@ethersproject/providers';
import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import { ethers } from 'ethers';
import { CONFIG } from 'src/config';
import { POLYNOTE_ABI } from 'src/utils/abi';
import { getRpcProvider } from 'src/utils/getRpcProvider';
import * as PushAPI from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import { formatAddress } from 'src/utils/formatAddress';

@Controller('listener')
export class ListenerController implements OnApplicationBootstrap {
  provider: JsonRpcProvider;
  constructor() {
    this.provider = getRpcProvider();
  }

  public async onApplicationBootstrap() {
    const contract = new ethers.Contract(
      CONFIG.POLYNOTE_CONTRACT,
      POLYNOTE_ABI,
      this.provider,
    );

    contract.on(
      'Shared',
      async (sender: string, noteId: string, recipient: string) => {
        await this.sendNotification(sender, noteId, recipient);
      },
    );
  }

  async sendNotification(sender: string, noteId: string, recipient: string) {
    if (CONFIG.APP_VERSION === 'development') {
      return;
    }

    const PK = process.env.PRIVATE_KEY; // channel private key
    const _signer = new ethers.Wallet(PK);

    try {
      await PushAPI.payloads.sendNotification({
        signer: _signer,
        type: 1,
        identityType: 2,
        notification: {
          title: `Polynote - Share`,
          body: `${formatAddress(
            sender,
          )} gave you an access to see the note with an ID of ${noteId}`,
        },
        payload: {
          title: `Polynote - Share`,
          body: `${formatAddress(
            sender,
          )} gave you an access to see the note with an ID of ${noteId}`,
          cta: recipient,
          img: '',
        },
        recipients: [recipient],
        channel: CONFIG.PUSH_CHANNEL_CAIP,
        env: ENV.STAGING,
      });
    } catch (err) {
      console.log(err?.response);
    }
  }
}
