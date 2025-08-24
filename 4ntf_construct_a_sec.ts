interface DataColumn {
  name: string;
  type: 'string' | 'number' | 'boolean';
  isNullable: boolean;
}

interface DataPipeline {
  name: string;
  columns: DataColumn[];
  source: {
    type: 'database' | 'api' | 'file';
    connection: {
      url: string;
      username: string;
      password: string;
    };
  };
  transformations: {
    [key: string]: {
      type: 'filter' | 'map' | 'aggregate';
      config: {
        [key: string]: any;
      };
    };
  };
  destination: {
    type: 'database' | 'api' | 'file';
    connection: {
      url: string;
      username: string;
      password: string;
    };
  };
  security: {
    encryption: {
      algorithm: 'AES' | 'RSA';
      key: string;
    };
    authentication: {
      type: 'username_password' | 'api_key';
      credentials: {
        username: string;
        password: string;
      };
    };
  };
}

interface DataPipelineGeneratorConfig {
  pipelineName: string;
  sourceType: 'database' | 'api' | 'file';
  destinationType: 'database' | 'api' | 'file';
  columns: DataColumn[];
  transformations: {
    [key: string]: {
      type: 'filter' | 'map' | 'aggregate';
      config: {
        [key: string]: any;
      };
    };
  };
  securityConfig: {
    encryptionAlgorithm: 'AES' | 'RSA';
    encryptionKey: string;
    authenticationType: 'username_password' | 'api_key';
    authenticationCredentials: {
      username: string;
      password: string;
    };
  };
}

class DataPipelineGenerator {
  config: DataPipelineGeneratorConfig;

  constructor(config: DataPipelineGeneratorConfig) {
    this.config = config;
  }

  generatePipeline(): DataPipeline {
    const pipeline: DataPipeline = {
      name: this.config.pipelineName,
      columns: this.config.columns,
      source: {
        type: this.config.sourceType,
        connection: {
          url: '',
          username: '',
          password: '',
        },
      },
      transformations: this.config.transformations,
      destination: {
        type: this.config.destinationType,
        connection: {
          url: '',
          username: '',
          password: '',
        },
      },
      security: {
        encryption: {
          algorithm: this.config.securityConfig.encryptionAlgorithm,
          key: this.config.securityConfig.encryptionKey,
        },
        authentication: {
          type: this.config.securityConfig.authenticationType,
          credentials: this.config.securityConfig.authenticationCredentials,
        },
      },
    };
    return pipeline;
  }
}