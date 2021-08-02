const REDIRECT_DELAY = 1000;

const REVERSE_MAPPING = {
    'introduction/index.html': ['introduction.html'],

    'glossary.html': ['terminology.html'],

    'tutorial/index.html': ['tutorial.html'],

    'user-guide/writing-workflows/index.html': [
        'user-guide/writing-suites.html',
        'suite-config.html',
    ],
    'user-guide/task-implementation/index.html': [
        'task-implementation.html',
    ],
    'user-guide/task-implementation/job-submission.html': [
        'task-job-submission.html',
    ],
    'user-guide/task-implementation/ssh-job-management.html': [
        'appendices/remote-job-management.html'
    ],
    'user-guide/writing-workflows/external-triggers.html': [
        'external-triggers.html'
    ],
    'user-guide/running-workflows.html': [
        'user-guide/running-suites.html',
        'running-suites.html',
    ],

    'reference/index.html': [
        'appendices/appendices-master.html',
    ],
    'reference/config/workflow.html': [
        'reference/config/suite.html',
        'appendices/suiterc-config-ref.html',
    ],
    'reference/config/global.html': [
        'appendices/site-user-config-ref.html',
    ],

    'workflow-design-guide/index.html': [
        'suite-design-guide/index.html',
        'suite-design-guide/suite-design-guide-master.html',
    ],
    'workflow-design-guide/style-guide.html': [
        'suite-design-guide/style-guide.html'
    ],
    'workflow-design-guide/general-principles.html': [
        'suite-design-guide/general-principles.html'
    ],
    'workflow-design-guide/efficiency.html': [
        'suite-design-guide/efficiency.html'
    ],
    'workflow-design-guide/portable-workflows.html': [
        'suite-design-guide/portable-suites.html'
    ]
};

function performDelayedRedirect(dest) {
    const redirectLink = document.getElementById('redirect-link');
    redirectLink.setAttribute('href', dest);
    window.setTimeout(() => {
        window.location.replace(window.location.origin + dest);
    }, REDIRECT_DELAY);
}

window.onload = () => {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('no-js');

    // Redirect if appropriate
    let path = window.location.pathname;
    for (const dest in REVERSE_MAPPING) {
        for (const tail of REVERSE_MAPPING[dest]) {
            if (path.endsWith(tail)) {
                body.classList.add('redirecting');
                path = path.replace(tail, dest);
                if (window.location.search) {
                    path += window.location.search;
                }
                if (window.location.hash) {
                    path += window.location.hash;
                }
                performDelayedRedirect(path);
                return;
            }
        }
    }
};
