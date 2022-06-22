interface IDataSource {
  connect: () => Promise<any>;
  disconnect: () => Promise<any>;
}

export default IDataSource;
