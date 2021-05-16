function queryBuilder(...query: string[]): void {
  console.log(query.join(' '));
}

queryBuilder('Am', 'I', 'working', '?');
