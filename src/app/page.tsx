import AuthButton from '@/components/AuthButton';
import { LoginWithGithubButton } from '@/components/LoginWithGithubButton';
import { createClient } from '@/utils/supabase/server';
import { Button, Group, Stack, Title, rem, Container, Text, Image, List, ThemeIcon, ListItem } from '@mantine/core';
import { cookies } from 'next/headers';
import Link from 'next/link';

import classes from './page.module.css';
import { IconCheck } from '@tabler/icons-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <Stack mt={rem(32)}>
        <Group justify='space-between'>
          <Title>Develog</Title>
          <Group>
            {user && <Button component={Link} href="/app">
              Go to dashboards
            </Button>}
            {!user && <AuthButton />}
            <ThemeToggle />
          </Group>
        </Group>
        <Container size="md">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Build <span className={classes.highlight}>dashboards</span> using your favorite javascript library
              </Title>
              <Text c="dimmed" mt="md">
                Build fully functional dashboards faster than ever - Use React, Vue, Svelte & more to build custom widgets
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <ListItem>
                  <b>Free and open source</b> - develog is released on github under the MIT license
                </ListItem>
                <ListItem>
                  <b>TypeScript support</b> - build type safe widgets
                </ListItem>
                <ListItem>
                  <b>Build using any framework</b> - comes with built in templates for React, Vue, Svelte & more
                </ListItem>
              </List>

              <Group mt={30}>
                {user ? (<Button
                  component={Link}
                  href="/app"
                  radius="xl" size="md" className={classes.control}
                >
                  Go to dashboards
                </Button>) : <LoginWithGithubButton
                  radius="xl" size="md" className={classes.control}
                  leftSection={null}
                  text="Get Started" />}
                <Button component={Link} target="_blank"
                  href="https://github.com/paripsky/develog" variant="default" radius="xl" size="md" className={classes.control}>
                  Source code
                </Button>
              </Group>
            </div>
            <Image src="/dashboards.svg" className={classes.image} />
          </div>
        </Container>
      </Stack>
    </main>
  );
}
