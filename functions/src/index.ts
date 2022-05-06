import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const admin = require("firebase-admin");
admin.initializeApp();
const axios = require("axios");

const msg91TemplateId = "61eeca20e73da90b34413fa2";
const msg91AuthKey = "372225AtKUWZBhw61ecdf4eP1";

// exports.sendOTP = functions.https.onRequest((request, response) => {
//   console.log("request", request.body);
//   const {phoneNumber} = request.body;
//   console.log("Phone Number::>>", phoneNumber);
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   const message = `Your OTP is ${otp}.
//   Please enter it to verify your phone number.`;
//   let OTPDataStoreKey;
//   admin
//       .firestore()
//       .collection("OTP")
//       .doc(phoneNumber).set({
//         otp: otp,
//       }).then((docRef) => {
//         OTPDataStoreKey = docRef.id;
//         console.log("Document written with ID: ", docRef);
//       }).catch((error) => {
//         console.error("Error adding document: ", error);
//       });

//   axios.get(`https://api.msg91.com/api/v5/otp?authkey=${msg91AuthKey}&template_id=${msg91TemplateId}&mobile=${phoneNumber}`)
//       .then((res) => {
//         console.log(res.data);
//         response.json({
//           message: message,
//           otp: otp,
//           DataBaseKey: OTPDataStoreKey,
//         });
//       })
//       .catch((error) => {
//         response.status(500).json({
//           error: error.code,
//         });
//       });
// });


exports.createBooking = functions.https.onRequest((request, response) => {
  const booking = request.body;
  admin
      .firestore()
      .collection("Booking")
      .doc().set(booking)
      .then( () => {
        response.json({
          id: booking.pickup,
          name: booking.name,
        });
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
}
);


exports.updateBooking = functions.https.onRequest((request, response) => {
  const booking = request.body;
  admin
      .firestore()
      .collection("Booking")
      .doc(booking.phoneNumber).set(booking)
      .then( () => {
        response.json({
          id: booking.phoneNumber,
          name: booking.pickup,
        });
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
}
);


exports.getBookings = functions.https.onRequest((request, response) => {
  admin
      .firestore()
      .collection("Bookings")
      .where(admin.firestore.FieldPath.documentId(), "==", request.id )
      .get()
      .then((querySnapshot) => {
        const bookings = [];
        querySnapshot.forEach((doc) => {
          const booking = doc.data();
          booking.pickup = doc.pickup;
          bookings.push(booking);
        });
        response.json(bookings);
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
});

exports.getAllBookings = functions.https
    .onRequest((request, response) => {
      admin
          .firestore()
          .collection("Booking")
          .get()
          .then((querySnapshot) => {
            const bookings = [];
            querySnapshot.forEach((doc) => {
              const booking = doc.data();
              bookings.push(booking);
            });
            response.json(bookings);
          })
          .catch((error) => {
            response.status(500).json({
              error: error.code,
            });
          });
    });


exports.createPackage = functions.https.onRequest((request, response) => {
  const package = request.body;
  admin
      .firestore()
      .collection("Package")
      .doc().set(package)
      .then( () => {
        response.json({
          id: package.id,
        });
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
}
);

exports.updatePackage = functions.https.onRequest((request, response) => {
  const package = request.body;
  admin
      .firestore()
      .collection("Package")
      .doc(package.id).update(package)
      .then( () => {
        response.json({
          id: package.id,
        });
      })
      .catch((error) => {
        response.status(500).json({
          error: error.code,
        });
      });
}
);

exports.getAllPackages = functions.https
    .onRequest((request, response) => {
      admin
          .firestore()
          .collection("Package")
          .get()
          .then((querySnapshot) => {
            const packages = [];
            querySnapshot.forEach((doc) => {
              const package = doc.data();
              packages.push(package);
            });
            response.json(packages);
          })
          .catch((error) => {
            response.status(500).json({
              error: error.code,
            });
          });
    });



