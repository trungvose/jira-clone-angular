export function parseFullName(fullName: string): [string, string] {
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) {
    return [fullName, ''];
  }

  const lastName = parts.pop();
  return [parts.join(' '), lastName];
}
