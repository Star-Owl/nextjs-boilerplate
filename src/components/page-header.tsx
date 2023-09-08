import type { FunctionComponent } from 'react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

interface HeroProps {}
const Hero: FunctionComponent<HeroProps> = ({}) => {
    return (
        <main>
            <Container maxWidth='lg' className='flex flex-col gap-6 py-10'>
                <Typography variant='h4' component='h2'>
                    Hello
                </Typography>
                <Stack direction={'row'} spacing={2}>
                    <Button variant={'default'}>Click me</Button>
                    <Button variant={'secondary'}>Click me</Button>
                    <Button variant={'outline'}>Click me</Button>
                    <Button variant={'ghost'}>Click me</Button>
                    <Button variant={'link'}>Click me</Button>
                    <Button variant={'destructive'}>Click me</Button>
                </Stack>
            </Container>
        </main>
    )
}

export default Hero
