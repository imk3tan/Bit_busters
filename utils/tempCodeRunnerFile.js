 let q=`INSERT INTO users VALUES ('${id()+i}', '${name}', '${username}', '${email}', '${password}', '${gender}', '${skillh()}', '${skillw()}', 'English,Spanish', 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=');`;

  connection.query(q, (err, results) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(results);
      });