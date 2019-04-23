import React, { Component } from "react";
import logo from "../assets/logo.svg";
import { Accordion, Button, Card } from "react-bootstrap";

class RewardsCard extends Component {
  render() {
    const points = this.props.points;
    return (
      <div className="container mx-auto">
        <div className="flex mt-4 justify-center">
          <div className="bg-soft-blue rounded-lg max-w-sm md:max-w-lg text-white font-sans font-bold md:h-64">
            <div className="flex items-flex justify-center">
              <div className="md:h-64">
                <div className="mt-2 md:mt-6 ml-2 md:ml-8">
                  <p className="text-xs md:text-2xl">Hotel Hopper</p>
                  <p className="text-xs md:text-3xl">Rewards Program</p>
                </div>
                <p className="text-xs md:text-3xl mt-2 md:mt-6 ml-2 md:ml-8 opacity-75">
                  Thank you for choosing Hotel Hopper as your booking website.
                  <br />
                  Here are the points you have accumulated so far.
                </p>
              </div>
              <div className="mt-2 md:mt-6 md:pl-6 md:h-64">
                <p className="text-xs md:text-2xl text-soft-blue"> ,</p>
                <p className="text-xs text-center md:text-3xl">
                  Reward Points:
                </p>
                <p className="text-4xl md:text-8xl text-center mt-2 md:mt-6 pl-4 pr-4 md:pl-12 md:pr-12 tracking-tight ">
                  8500
                </p>
              </div>
            </div>
            <hr className="mt-4 border" />
            <h1 className="text-black m-4">Frequently asked questions</h1>
            <Accordion className="bg-soft-blue">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

export default RewardsCard;
