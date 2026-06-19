import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_8g2jb3z";

const TEMPLATE_NOTIFICATION = "template_for8598";
const TEMPLATE_CONFIRMATION = "template_4qnnkzo";

const PUBLIC_KEY = "NXcu4-01wN8JmjzBb";

export const sendDateRequest = async ({
  name,
  email,
  activity,
  date,
  time,
  timeComment,
}) => {
  const templateParams = {
    name,
    email,
    activity,
    date,
    time,
    timeComment,
  };

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_NOTIFICATION,
    templateParams,
    PUBLIC_KEY
  );

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_CONFIRMATION,
    templateParams,
    PUBLIC_KEY
  );
};