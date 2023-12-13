import Buttons from "@/components/Buttons";
import Form from "@/components/Form";
import { Input } from "@/components/Input";
import { createUserAction } from "@/contexts/user/application/actions/createUser";

interface PageProps {
  searchParams: {
    email: string;
  };
}

export default async function SingUpPage(
  props: PageProps
) {
  const {
    searchParams: { email },
  } = props;

  if (email) {
    const defaultUser = {
      address: "",
      first_name: "",
      last_name: "",
      phone: "",
      verified: false,
      email,
    };
    const initalPassword = "demo";
    try {
        await createUserAction(
          undefined,
          defaultUser,
          initalPassword
        );

    } catch (error){ 
        console.log(error);
    }

    return (
      <section>
        <h1 className="text-6xl">Sign Up</h1>

        <p className="text-lg py-5">
          An authentication email has been sent to
          your mailbox.
        </p>
        <p className="text-lg py-1">
          Please review your mailbox and click on
          the link to authenticate your account
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-6xl">Sign Up</h2>
      <div className="flex flex-col items-center justify-center">
        <Form>
          <div className="flex flex-col justify-center w-full my-2">
            <label
              htmlFor="email"
              className="text-2xl py-4"
            >
              Email
            </label>
            <Input
              name="email"
              placeholder="example@domain.com"
            />
          </div>
          <div className="flex items-center w-full">
            <Buttons.Button
              type="submit"
              className="w-full m-0 my-2"
            >
              Send
            </Buttons.Button>
          </div>
        </Form>
      </div>

      <div className="flex flex-col justify-center text-lg py-10 hover:underline">
        <Buttons.Link
          href="/login"
          className="bg-transparent text-center"
        >
          I already have an account
        </Buttons.Link>
      </div>
    </section>
  );
}
