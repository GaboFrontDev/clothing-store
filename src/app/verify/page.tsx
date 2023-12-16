import Buttons from "@/components/Buttons";
import { validateUserAction } from "@/contexts/user/application/actions/validateUser";

interface PageProps {
  searchParams: {
    i: string;
    r: string
  };
}

export default async function VerifyPage(
  props: PageProps
) {
  const {
    searchParams: { i: credentialUUID },
  } = props;
  try {
    const {user, result: validated} = (await validateUserAction(credentialUUID));
    if(!validated) {
      return (
        <>
          Link has expired, please{" "}
          <Buttons.Link
            href={`/verify?r${user.data[0].id}`}
          >
            click here
          </Buttons.Link>{" "}
          to receive another one
        </>
      );

    }

    
  } catch (error) {
    console.log("Error happened at token validation");

  }

  return <></>;
}
