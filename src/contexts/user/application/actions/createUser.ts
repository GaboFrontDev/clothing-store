import {
  NextRequest,
  NextResponse,
} from "next/server";
import { UserController } from "../UserController";
import {
  UserEntity,
  UserPayloadEntity,
} from "../../domain/UserEntity";

const { createUser } = new UserController();

function createUserObject(
  data: UserPayloadEntity
) {
  return {
    address: data.address,
    first_name: data.first_name,
    last_name: data.last_name,
    phone: data.phone,
    email: data.email,
    verified: false,
  };
}

function createSuccessObject(user: UserEntity) {
  return {
    sucess: true,
    result: {
      ...user,
      password: null,
    },
    message:
      "Verification email has been sent to your mail box",
  };
}

export async function createUserAction(
  req?: NextRequest,
  data?: UserPayloadEntity,
  password?: string
) {
  try {
    let user = null;
    if (req) {
      const data =
        (await req.json()) as UserPayloadEntity & {
          password: string;
        };
      if (!data.password) {
        throw Error("Missing required pasword");
      }
      const userObject = createUserObject(data);
      user = await createUser(
        userObject,
        data.password
      );

      const sucessObject =
        createSuccessObject(user);
      return NextResponse.json({
        sucessObject,
        status: 201,
      });
    }

    if (data) {
      if (!password) {
        throw Error("Missing required pasword");
      }
      const userObject = createUserObject(data);
      user = await createUser(
        userObject,
        password
      );
      return {
        ...user,
        password: null,
      };
    }
  } catch (error) {
    if (!req) {
      throw error;
    }
    return NextResponse.json(
      {
        sucess: false,
      },
      {
        status: 500,
      }
    );
  }
}
