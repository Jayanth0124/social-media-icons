import { generateButtonSvg } from '../../components/PortfolioButton';

export default function handler(req, res) {
  // Grab custom text and theme from the URL parameters
  const { text = 'ACCESS PORTFOLIO', theme = 'royal' } = req.query;

  try {
    const svg = generateButtonSvg({ text, themeName: theme });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=60');
    
    return res.status(200).send(svg);
    
  } catch (error) {
    console.error("Button generation failed:", error);
    return res.status(500).json({ error: "Failed to generate button" });
  }
}