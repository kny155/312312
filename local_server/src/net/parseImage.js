export default async (data) => {
  const img = [];
  for(const buf of data) {
    let i = 0;
    while (i < buf.length) {
      const byte12 = buf[i+1] << 8 | buf[i];

      const r5 = ( byte12 >> 11);
      const g6 = (byte12 >> 5) & 0x3f;
      const b5 = byte12 & 0x1f;

      const r8 = ( r5 << 3 ) | (r5 >> 2);
      const g8 = ( g6 << 2 ) | (g6 >> 4);
      const b8 = ( b5 << 3 ) | (b5 >> 2);

      img.push(b8, g8, r8);

      i += 2;
    }
  }
  return await img;
};