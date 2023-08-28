import { CHAIN_NODE } from "./constants";
import { ProcessorConfig } from "./types";

export const config: ProcessorConfig = {
  chainName: 'bifrost',
  prefix: 'bifrost',
  dataSource: {
    archive: 'https://bifrost.archive.subsquid.io/graphql',
    chain: CHAIN_NODE,
  },
}
