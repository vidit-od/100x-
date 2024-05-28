import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// add users function
async function InsertUser(username:string,password:string,firstName:string,lastName:string ) {
  const res = await prisma.user.create({
    data:{
      username,
      password,
      firstName,
      lastName
    }
  });
  console.log(res);
}


// update users
interface updateInterface{
  firstName:string,
  lastName: string,
}
async function UpdateUser(username:string, {
  firstName,
  lastName
}:updateInterface) {
  const res = await prisma.user.update({
    where: {username},
    data:{
      firstName,
      lastName
    }
  });
  console.log(res);
}

//get a user
async function getUser(username:string) {
  const res = await prisma.user.findFirst({
    where: {username: username}
  })
  console.log(res);
}

getUser('vidit8@gmail.com')
