import React from "react";
const About = () => {
  return (
    <div className='about'>
      <div className=' flex-col flex  md:flex-row justify-between items-center h-full py-5 '>
        <img
          src='./images/human.jpg'
          className='flex flex-row px-10 py-14 w-1/1 h-1/1 md:w-2/5 h-4/5 '
        />
        <div>
          <h1 className='text-black font-extrabold text-center text-4xl py-7 font-sans'>
            More about Lung Cancer
          </h1>
          <div className='para'>
            <p className='text-black  md:text-base py-3 font-sans '>
              Causes and Risk Factors:
              <br />
              - Highlight common causes such as smoking, exposure to
              carcinogens, and genetic factors.
              <br />- Discuss risk factors that increase the likelihood of
              developing lung cancer.
            </p>

            <p className='text-black text-base py-3 font-sans  '>
              Prevention Strategies:
              <br />
              - Emphasize lifestyle changes, including smoking cessation and
              reducing exposure to environmental pollutants.
              <br />- Provide information on vaccination, a healthy diet, and
              regular exercise as preventive measures.
            </p>

            <p className='text-black text-base py-3 font-sans  '>
              Early Detection:
              <br />
              - Stress the importance of early detection through regular
              screenings, especially for high-risk individuals.
              <br />- Educate on recognizing early symptoms such as a persistent
              cough, chest pain, or difficulty breathing.
            </p>

            <p className='text-black text-base py-3 font-sans  '>
              Diagnosis Process:
              <br />
              - Outline the diagnostic procedures involved, including imaging
              tests (X-rays, CT scans), biopsies, and blood tests.
              <br />- Explain how early diagnosis contributes to more effective
              treatment options.
            </p>

            <p className='text-black text-base py-3 font-sans  '>
              Staging and Treatment Planning:
              <br />
              - Discuss the staging process to determine the extent of cancer
              spread.
              <br />- Provide an overview of treatment options, which may
              include surgery, chemotherapy, radiation, and targeted therapies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
