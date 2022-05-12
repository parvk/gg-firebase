import * as functions from "firebase-functions"
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
admin.initializeApp();


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
  const userId = request.body.userId;
  admin
      .firestore()
      .collection("Booking")
      .doc(userId).set(booking)
      .then( () => {
        response.json({
          id: booking.userId,
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
  cors(request, response, () => {
    const userId = request.body.userId;
    admin
        .firestore()
        .collection("Bookings")
        .doc(userId)
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

exports.getBookingDetails = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const bookingId = request.body.bookingId;
    admin
        .firestore()
        .collection("Bookings")
        .doc(bookingId)
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
});

exports.createPackage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
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
  });
});

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
      cors(request, response, () => {
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
    });


