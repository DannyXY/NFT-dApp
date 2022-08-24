// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const tokenId = req.query.tokenId;

  const name = `Crypto Dev ${tokenId}`;
  const description = "CryptoDevs is an NFT collection for Web3 Developers";
  const image = `https://raw.githubusercontent.com/LearnWeb3DAO/NFT-Collection/main/my-app/public/cryptodevs/${
    Number(tokenId) - 1
  }.svg`;

  if (Number(tokenId) == 1) {
    res.status(200).json({
      name: name,
      description: description,
      image:
        "https://res.cloudinary.com/dannyxyz/image/upload/v1660585225/20220523_204959_0000_blyun1.png",
    });
  }else if(Number(tokenId) == 2 ){
    res.status(200).json({
      name: name,
      description: description,
      image:
        "https://res.cloudinary.com/dannyxyz/image/upload/v1660822520/IMG-20220818-WA0024_jbhqdi.jpg",
    });
  } else {
    res.status(200).json({
      name: name,
      description: description,
      image: image,
    });
  }
}
