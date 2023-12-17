import Buttons from "@/components/Buttons";
import { resendUserTokenAction } from "@/contexts/user/application/actions/resendUserToken";
import { validateUserAction } from "@/contexts/user/application/actions/validateUser";

interface PageProps {
  searchParams: {
    i: string;
    r: string;
  };
}

export default async function VerifyPage(
  props: PageProps
) {
  const {
    searchParams: {
      i: credentialUUID,
      r: retryCredentialID,
    },
  } = props;
  if(retryCredentialID) {
    try {
      await resendUserTokenAction(retryCredentialID);
      return <>A new link has been send to your mailbox</>;
    } catch(error) {
      return (
        <>
          Your account is already verified,{" "}
          <Buttons.Link
            className="bg-transparent hover:underline p-0 m-0"
            href={`/login?i=${credentialUUID}`}
          >
            please click here
          </Buttons.Link>{" "}
          to login
        </>
      );

    }
  }
  try {
    const { user, result: validated } =
      await validateUserAction(credentialUUID);
    if (!validated) {
      return (
        <>
          Link has expired,{" "}
          <Buttons.Link
            className="bg-transparent hover:underline p-0 m-0"
            href={`/verify?r=${credentialUUID}`}
          >
            please click here
          </Buttons.Link>{" "}
          to receive another one to your mailbox
        </>
      );
    }
  } catch (error) {
    console.log(
      "Error happened at token validation"
    );
    console.log(error);
    
  }

  return <>Hi!</>;
}
