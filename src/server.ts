import app from "./app";
import {
    intervalCheckNSendReminders,
    scanReminders,
} from "./util/sendReminder";
import createCertificate from "./util/createCertificate";

const server = app.listen(app.get("port"), () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    intervalCheckNSendReminders();
});

export default server;
