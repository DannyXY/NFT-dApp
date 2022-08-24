// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const tokenId = req.query.tokenId;

  const name = `Crypto Dev ${tokenId}`;
  const description = "CryptoDevs is an NFT collection for Web3 Developers";
  const image = `https://0xwagminft.vercel.app/api/${Number(tokenId) - 1}.svg`;

  if (Number(tokenId) == 1) {
    res.status(200).json({
      name: name,
      description: description,
      image: "https://0xwagminft.vercel.app/api/0.png",
    });
  } else {
    res.status(200).json({
      name: name,
      description: description,
      image: image,
    });
  }
}
