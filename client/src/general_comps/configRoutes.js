import { Router } from 'express'
import React from 'react'
import Home from './home'

export default function ConfigRoutes() {

    return (
        <div>
            <Router>
                <Router>
                    {/* <Route index element={<Home />} /> */}
                    <Router path="/home" element={<Home/>} />
                    <Router path="/login" element={<Upcoming />} />
                    {/* <Router path="/record/:user" element={<Record />} /> */}
                    <Router path="*" element={<NotFound />} />
                </Router>
            </Router>
        </div>
    )
}
