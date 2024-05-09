const notifications = require("./email-notifications");
const db = require("../models");
const TeamMember = db.TeamMember;

async function notifyEmailCreationApplicant(request) {
  const emailData = await getEmailData(request);

  // let approversMails = await getNextApprover(newStatus)
  let subjectApplicant = "New Legal Request created successfully";

  // To applicant
  const emailUser = {
    to: request.applicant,
    subject: subjectApplicant,
    template: "templates/new-request-created.html",
  };
  notifications.emailNotification(emailUser, emailData); // To User
}

async function notifyEmailApprovalRequired(data) {
  if (data?.review) {
    const request = data.request;
    const idTeam = data.idTeam;
    let subjectApprover = "A legal request needs to be reviewed again by your team";

    try {
      const teamMails = await getAllMailsFromTeam(idTeam);
      const emailData = await getEmailData(request, data.comment);
      teamMails.forEach((mail) => {
        const emailApprover = {
          to: mail,
          subject: subjectApprover,
          template: "templates/request-new-approval.html",
        };
        notifications.emailNotification(emailApprover, emailData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Error getting info from  " + tr + err,
      });
    }

  } else {
    console.log(data)
    const request = data.request;
    const teamsRequired = data.teamsRequired;

    let subjectApprover = "A legal request needs a review from your team";

    const promises = teamsRequired.map(async (tr) => {
      try {
        const teamMails = await getAllMailsFromTeam(tr.idTeam);
        const emailData = await getEmailData(request, tr.comment);
        teamMails.forEach((mail) => {
          const emailApprover = {
            to: mail,
            subject: subjectApprover,
            template: "templates/request-new-approval.html",
          };
          notifications.emailNotification(emailApprover, emailData);
        });
      } catch (err) {
        console.log(err);
        res.status(500).send({
          message: "Error getting info from  " + tr + err,
        });
      }
    });
    await Promise.all(promises);
  }
}

/* reviewers structure
      reviewers = 
      [
        {
          name = A. Blanco,
          team = Legal
        },
        {
          ...
        }
      ]
      */
async function notifyEmailRequestReviewed(request) {
  // console.log('request', request);
  // console.log('reviewers', request.TeamRequireds);

  let emailData = await getEmailData(request);
  // emailData = await addReviewers(emailData, reviewers)

  let subject = "Legal request reviewed";

  // To applicant
  const emailUser = {
    to: request.applicant,
    subject: subject,
    template: "templates/request-reviewed.html",
  };
  notifications.emailNotification(emailUser, emailData);
}

const getEmailData = async function (request, commentForTeam) {
  const homeLink = `https://legal.tools.idneo.com/`;
  const approveLink = `https://legal.tools.idneo.com/reviewer`;
  const res = {
    homeLink: homeLink,
    applicant: request.applicant,
    projectName: request.projectName,
    CreateDate: request.createdDate, //arreglar
    deadline: request.deadline,
    priority: request.priority,
    purpose: request.purpose,
    description: request.description,
    background: request.background,
    foreground: request.foreground,
    comments: request.comments,
    price: request.price,
    paymentMethod: request.paymentMethod,
    commentForTeam: commentForTeam,
  };
  return res;
};

const getAllMailsFromTeam = async function (idTeam) {
  try {
    const data = await TeamMember.findAll({
      where: { idTeam: idTeam },
    });
    return data.map((d) => d.dataValues.email);
  } catch (err) {
    console.error(err);
    throw new Error("Server Error");
  }
};

const addReviewers = async function (emailData, reviewers) {
  res = "";
  for (r of reviewers) {
    res += r.name + " (" + r.team + "), ";
  }
  emailData["reviewers"] = res == "" ? "" : res.slice(0, -2);
  return emailData;
};

module.exports = {
  notifyEmailCreationApplicant: notifyEmailCreationApplicant,
  notifyEmailApprovalRequired,
  notifyEmailRequestReviewed,
};
