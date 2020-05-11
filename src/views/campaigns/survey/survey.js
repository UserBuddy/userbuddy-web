import Userbuddy from '../../../userbuddy';
import Popup from '../../shared/popup/popup';
import ThumbRating from './question-types/thumb-rating';
import TextInput from './question-types/text-input';
import MultipleChoice from './question-types/multiple-choice';
import SurveyConclusion from './conclusion/survey-conclusion';

export default class Survey {
  constructor({ campaign }) {
    this.responses = [];
    this.introShown = false;
    this.conclusionShown = false;
    this.submitted = false;

    this.campaign = campaign;

    switch (campaign.display.type) {
      case "Popup":
        const popup = new Popup({ child: null });
        this.container = popup;
        break;
      default:
        console.log(`Userbuddy: cannot display survey with unknown type ${campaign.display.type}`);
        return;
    }

    this._displayNext();
  }

  _displayNext() {
    const index = this.responses.length;
    const intro = this._survey.introduction;
    if (intro && !this.introShown) {
      this._displayIntroduction({ introduction: intro });
      return;
    }
    if (index >= this._questions.length && !this.conclusionShown) {
      const conclusion = this._survey.conclusion;
      if (conclusion) {
        this._displayConclusion({ conclusion: conclusion });
      } else {
        this._submit();
      }
      return;
    }

    const question = this._questions[index];
    this._displayQuestion({ question: question });
  }

  _displayIntroduction({ introduction }) {
    // TODO: display introduction
  }

  _displayQuestion({ question }) {
    let child;
    switch (question.template) {
      case "ThumbRating":
        const thumbRating = new ThumbRating({
          question,
          onPress: (isThumbsUp) => {
            this._logResponse({
              response: isThumbsUp,
              question,
            });
          },
        });
        child = thumbRating.node;
        break;
      case "TextInput":
        const textInput = new TextInput({
          question,
          onSubmit: (inputText) => {
            this._logResponse({
              response: inputText,
              question,
            });
          },
        });
        child = textInput.node;
        break;
      case "MultipleChoice":
        const multipleChoice = new MultipleChoice({
          question,
          onSubmit: (option) => {
            this._logResponse({
              response: option,
              question,
            });
          },
        });
        child = multipleChoice.node;
        break;
      default:
        this._submit();
        return;
    }

    this.container.set({ child: child });
  }

  _displayConclusion({ conclusion }) {
    this.conclusionShown = true;
    const submit = () => {
      return () => {
        this._submit();
      };
    };
    const conclusionContainer = new SurveyConclusion({
      conclusion,
      onDismiss: submit(),
    });
    setTimeout(submit(), conclusion.duration);
    this.container.set({ child: conclusionContainer.node });
  }

  _logResponse({response, question}) {
    const eventResponse = {
      name: '$SurveyQuestionResponse',
      params: {
        '$campaignId': this.campaign.id,
        '$questionId': question.id,
        '$responseValue': response,
      },
    };
    this.responses.push(eventResponse);
    this._displayNext();
  }

  _submit() {
    if (this.submitted) return;
    this.node.parentNode.removeChild(this.node);
    Userbuddy.events._trackMany({
      events: this.responses,
    });
    Userbuddy.campaigns._complete({
      campaign: this.campaign,
    });

    this.submitted = true;
  }

  get _survey() {
    return this.campaign.typeData.survey;
  }
  get _questions() {
    return this._survey.questions;
  }

  get node() {
    return this.container.node;
  }
}
