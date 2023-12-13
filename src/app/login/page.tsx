import Buttons from "@/components/Buttons";
import Form from "@/components/Form";
import { Input } from "@/components/Input";

interface PageProps {
  searchParams: {
    email: string;
  };
}

export default function LoginPage(
  props: PageProps
) {
  const {
    searchParams: { email },
  } = props;

  if (email) {
    
    return (
      <section>
        <h1 className="text-6xl">Login</h1>

        <p className="text-lg py-5">
          An authentication email has been sent to {" "}
          <b>{email}</b>
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
      <h2 className="text-6xl">Login</h2>
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
          href="/signup"
          className="bg-transparent text-center"
        >
          I don&apos;t have account
        </Buttons.Link>
      </div>
    </section>
  );
}
