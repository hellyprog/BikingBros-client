export class AppConfig {
    contract!: ContractsConfiguration;
}

export class ContractsConfiguration {
    customsContractAddress!: string;
    insuranceStoreContractAddress!: string;
    wsProvider!: string;
}