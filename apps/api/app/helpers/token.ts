export const generateToken =(n: number) => {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for ( let i = 0; i < n; i++ ) {
    randomString += characters.charAt(Math.floor(Math.random()*characters.length));
 }
 
 return randomString;
}