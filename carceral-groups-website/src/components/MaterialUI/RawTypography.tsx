import Typography, { TypographyProps } from '@mui/material/Typography';

interface RawTypographyProps extends TypographyProps {
  htmlContent: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RawTypography(props: RawTypographyProps) {
  return (
    <Typography {...props} dangerouslySetInnerHTML={{ __html: props.htmlContent }} />
  );
}