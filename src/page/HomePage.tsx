import { alpha, Box, Paper, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 140px)",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Laipni lūdzam literārā teksta analīzes rīkā!
      </Typography>
      <Paper
        elevation={2}
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          padding: "16px",
          textAlign: "justify",
        })}
      >
        <Typography variant="body1" gutterBottom>
          <Box>
            Šī vietne ir veidota, lai palīdzētu skolēniem un skolotājiem pārskatāmi analizēt literārus tekstus, attīstīt
            teksta analīzes prasmes un atvieglot eseju plānošanu.
          </Box>
          <Box  sx={{ pt: "20px"}}>
            Sadaļā “augšupielāde” iespējams augšupielādēt tekstu PDF formātā un iezīmēt tajā nozīmīgus fragmentus, frāzes
            un citātus. Labajā pusē redzamas dažādas literārās analīzes kategorijas – burciņas. Tās palīdzēs lasīšanas
            laikā viegli pamanīt un atcerēties būtiskākās vietas, kā arī iezīmētos fragmentus iedalīt kategorijās,
            tādējādi analizējot tekstu.
          </Box>
          <Box  sx={{ pt: "20px"}}>
            Sadaļā “teksta analīze” visi iezīmētie fragmenti ir apkopoti pa kategorijām. Šeit tos var sakārtot vēl
            precīzāk, piemēram, sadalīt pēc atsevišķiem tēliem vai valodas līdzekļiem (metaforām, salīdzinājumiem, u. c.),
            kā arī atzīmēt svarīgākos citātus kā favorītus.
          </Box>
          <Box  sx={{ pt: "20px"}}>
            Sadaļā “piezīmes” iespējams pārskatīt atlasītos citātus, plānot esejas struktūru un pierakstīt papildu
            piezīmes. Tas palīdz soli pa solim pārvērst lasīšanas laikā radušās idejas skaidrā un argumentētā tekstā.
          </Box>
          <Box  sx={{ pt: "20px"}}>
            Šis rīks ir paredzēts gan mācību darbam klasē, gan patstāvīgai literārā teksta analīzei mājās.
          </Box>
          <Box  sx={{ pt: "20px"}}>
            Veiksmi darbā!
          </Box>
        </Typography>
      </Paper>
    </Paper>
  );
}