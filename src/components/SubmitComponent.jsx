import React from 'react'

export default function SubmitComponent(props) {

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
        <div className="p-8 bg-white rounded shadow-lg">
          <h2
            style={{ display:props.reload }}
            className="text-gray-700 font-bold mb-4 text-center"
          >
            You Got {props.score} Out of {props.questions.length}!
          </h2>
          <div className="flex justify-center gap-x-4 mt-4">
            <button
              style={{ display: props.reload }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
            {props.disable?
            <button
              className="bg-blue-500 cursor-not-allowed hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={props.submitFunction}
              disabled={props.disable}
            >
              Submit
            </button>: <button
              className="bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={props.submitFunction}
              disabled={props.disable}
            >
              Submit
            </button>}
          </div>
        </div>
      </div>
  )
}
