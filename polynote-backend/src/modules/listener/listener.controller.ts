import { JsonRpcProvider } from '@ethersproject/providers';
import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import { ethers } from 'ethers';
import { CONFIG } from 'src/config';
import { POLYNOTE_ABI } from 'src/utils/abi';
import { getRpcProvider } from 'src/utils/getRpcProvider';

@Controller('listener')
export class ListenerController implements OnApplicationBootstrap {
  provider: JsonRpcProvider;
  constructor() {
    this.provider = getRpcProvider();
  }

  onApplicationBootstrap() {
    const ShareEventABI = 'Shared(address,string,address)';
    const shareEvent = {
      address: CONFIG.POLYNOTE_CONTRACT_SCROLL,
      topics: [ethers.utils.id(ShareEventABI)],
    };

    const contract = new ethers.Contract(
      CONFIG.POLYNOTE_CONTRACT_SCROLL,
      POLYNOTE_ABI,
      this.provider,
    );

    contract.on('Shared', (a, b, c) => {
      console.log(a, b, c);
    });

    // this.provider.on(shareEvent, async (log, b) => {
    //   console.log(log, b);
    // });
  }
}
