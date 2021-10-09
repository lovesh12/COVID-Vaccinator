import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

function MutationAlert(props) {
    const { mutation, successMsg, onSuccess } = props;

    const resetMutation = () => {
        mutation.reset();
        onSuccess();
    };

    return (
        <>
            {mutation.isError && (
                <ErrorAlert
                    title={"An error has occurred"}
                    subTitle={mutation.error.message}
                    onClose={resetMutation}
                />
            )}
            {mutation.isSuccess && (
                <SuccessAlert
                    title={"Success"}
                    subTitle={successMsg}
                    onClose={resetMutation}
                />
            )}
        </>
    );
}

export default MutationAlert;