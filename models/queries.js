const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addUserToDB = async (user) => {
  const prismaUser = await prisma.users.create({
    data: {
      username: user.username,
      password: user.password,
      contents: {
        create: {
          title: user.username,
          // children: []
        },
      },
    },
  });

  return prismaUser;
};

exports.getUserByUsername = async (username) => {
  const user = await prisma.users.findUnique({
    where: {
      username: username,
    },
  });
  console.log(user);

  return user;
};

exports.getUserByID = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

exports.getUserContentsByID = async (id) => {
  const { contentsID } = await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: { contentsID: true },
  });

  const contents = await prisma.contents.findUnique({
    where: {
      id: contentsID,
    },
  });

  return contents;
};

exports.getContentChildren = async (contentsID) => {
  const contents = await prisma.contents.findMany({
    where: {
      parentID: contentsID,
    },
  });

  return contents;
};

exports.addFolder = async (contentsID, name, user) => {
  const current = await prisma.contents.findUnique({
    where: {
      id: contentsID,
    },
  });

  current.parentID =
    current.parentID == null ? user.contentsID : current.parentID;

  console.log(current.parentID);
  

  const parent = await prisma.contents.update({
    where: {
      id: current.parentID,
    },
    data: {
      children: {
        create: {
          title: name,
          type: "DIRECTORY",
        },
      },
    },
  });

  return parent;
};

async () => {
  console.log(
    await prisma.users.findMany({
      include: { content: true },
    })
  );

  console.log(
    await prisma.contents.findMany({
      include: { children: true },
    })
  );

  console.log();

  // const update = await prisma.users.update({
  //   where: {
  //     username: "user1",
  //   },
  //   data: {
  //     contents: {
  //       children: {
  //       },
  //     },
  //   },
  // });
}; //();
