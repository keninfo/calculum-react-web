import { Container, Grid, Link, Paper, Typography } from '@mui/material'
import TopCard from '../TopCard'

const Home = () => {
  return (
    <Container style={{ width: '100%', maxWidth: '100%' }}>
      <Grid container>
        <Grid item xs={10} sm={1} className="pl-0">
          <Paper elevation={0} style={{ backgroundColor: '#fff', borderRadius: '12px', height: '100%' }}>
            <Container className="pl-0">
              <Typography variant="h6" className="font-weight-bold" style={{ fontSize: '1.35rem' }}>
                <Link href="#">
                  <p>
                    <span className="text-yellow font-weight-bold">{'>'}</span>Home
                  </p>
                </Link>
                <Link href="#">
                  <p>
                    <span className="text-yellow font-weight-bold">{'>'}</span>Vaults
                  </p>
                </Link>
                <Link href="https://calculum.gitbook.io/calculum-docs" target="_blank" rel="noopener noreferrer">
                  <p>
                    <span className="text-yellow font-weight-bold">{'>'}</span>Docs
                  </p>
                </Link>
                <Link href="https://medium.com/@CalculumFi" target="_blank" rel="noopener noreferrer">
                  <p>
                    <span className="text-yellow font-weight-bold">{'>'}</span>Blog
                  </p>
                </Link>
              </Typography>
            </Container>
          </Paper>
        </Grid>

        <Grid item style={{ padding: 0 }}>
          <TopCard />

          {/* <Grid container justifyContent="space-around" style={{ marginTop: '2rem' }}>
            <Grid item>
              <Vault1 />
            </Grid>

            <Grid item>
              <Vault2 />
            </Grid>

            <Grid item>
              <Vault3 />
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
