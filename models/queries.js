const { PrismaClient, ContentType } = require("@prisma/client");
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

  return user;
};

exports.getUserByID = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });
  return user;
};

exports.getUserContentsByID = async (id) => {
  const { contentsID } = await prisma.users.findUnique({
    where: {
      id: Number(id),
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

exports.getContentsByID = async (contentsID) => {
  const contents = await prisma.contents.findUnique({
    where: {
      id: Number(contentsID),
    },
  });

  return contents;
};

exports.getContentChildren = async (contentsID) => {
  const contents = await prisma.contents.findMany({
    where: {
      parentID: Number(contentsID),
    },
  });

  return contents;
};

exports.addFolder = async (contentsID, name) => {
  const parent = await prisma.contents.update({
    where: {
      id: contentsID,
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

exports.addFile = async (contentsID, name, path) => {
  const parent = await prisma.contents.update({
    where: {
      id: Number(contentsID),
    },
    data: {
      children: {
        create: {
          title: name,
          url: path,
          type: "FILE",
        },
      },
    },
  });

  return parent;
};

exports.deleteFile = async (contentsID) => {
  const deleted = await prisma.contents.delete({
    where: {
      id: Number(contentsID),
    },
  });

  return deleted;
};

exports.deleteFolder = async (contentsID) => {
  const folder = await prisma.contents.delete({
    where: {
      id: contentsID,
    },
  });

  return folder;
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
