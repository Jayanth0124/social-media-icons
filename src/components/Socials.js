import { generateSocialIconSvg } from '../../components/SocialIcon';

export default function handler(req, res) {
  // Grab the icon name and theme from the URL
  const { icon = 'instagram', theme = 'royal' } = req.query;

  try {
    const svg = generateSocialIconSvg({ icon, themeName: theme });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    return res.status(200).send(svg);
    
  } catch (error) {
    console.error("Icon generation failed:", error);
    return res.status(500).json({ error: "Failed to generate icon" });
  }
}