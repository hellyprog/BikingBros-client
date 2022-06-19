export class AppConfig {
    contract!: ContractsConfiguration;
    mumbaiNetworkId!: number;
}

export class ContractsConfiguration {
    bikeContractAddress!: string;
    wsProvider!: string;
}