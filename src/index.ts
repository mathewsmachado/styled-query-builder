export function queryBuilder(...query: string[]): string {
  return query.join(' ');
}

console.log(queryBuilder('Am', 'I', 'working', '?'));
