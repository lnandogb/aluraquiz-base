import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import {motion} from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

/* const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`; */ 

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz - Skyrim</title>
        <meta name="viewport" />
        <meta property="og:image" content="https://4kwallpaper.wiki/wp-content/uploads/2019/09/298296-1.jpg" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <QuizContainer>
        <QuizLogo src={db.logo} />
        <Widget 
        as={motion.section}
        transition={{delay: 0, duration: 0.5}}
        variants={{
          show: {opacity: 1, y:'0'},
          hidden: {opacity: 0, y:'100%'},
        }}
        initial="hidden"
        animate="show"
        >
          <Widget.Header>
            <h1>The Elder Scrolls V: Skyrim</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function(infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`)
            }}>
              <Input
                name="nomeDoUsuario" 
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Prencha seu nome" 
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar        
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
        as={motion.section}
        transition={{delay: 0.5, duration: 0.5}}
        variants={{
          show: {opacity: 1},
          hidden: {opacity: 0},
        }}
        initial="hidden"
        animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <ul>
            {db.external.map((linkExterno) => {
              const [projectName, githubUser] = linkExterno
              .replace(/\//g, '')
              .replace('https:', '')
              .replace('.vercel.app', '')
              .split('.');

              return (
                <li key={linkExterno}>
                  <Widget.Topic
                  as={Link} 
                  href={`/quiz/${projectName}___${githubUser}`}    
                  >
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              )
            })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
          as={motion.footer}
          transition={{delay: 0.5, duration: 0.5}}
          variants={{
            show: {opacity: 1},
            hidden: {opacity: 0},
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/lnandogb" />
    </QuizBackground>
  );
}
