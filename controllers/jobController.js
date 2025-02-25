const multer = require('multer');
const path = require('path');
const jobModel = require('../models/jobModel');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/files')); // Ensure correct path resolution
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename);
    }
});

// Multer file filter: Only allow PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

const jobController = {
    getAllJobs: (req, res) => {
        const jobs = jobModel.getAllJobs();
        res.render("jobListings", { jobs, userEmail: req.session?.userEmail });
    },

    getJobById: (req, res) => {
        const jobId = req.params.id;
        const job = jobModel.getJobById(jobId);
        res.render("jobDetails", { job, userEmail: req.session?.userEmail });
    },

    showCreateJob: (req, res) => {
        res.render("createJob", { userEmail: req.session?.userEmail });
    },

    createJob: (req, res) => {
        jobModel.addJob(req.body);
        res.redirect("/jobs");
    },

    viewEditForm: (req, res) => {
        const jobId = req.params.id;
        const job = jobModel.getJobById(jobId);
        res.render("editJob", { job, userEmail: req.session?.userEmail });
    },

    updateJob: (req, res) => {
        jobModel.updateJobById(req.params.id, req.body);
        res.redirect(`/jobs/${req.params.id}`);
    },

    deleteJob: (req, res) => {
        jobModel.deleteJobById(req.params.id);
        res.json({ message: 'Job deleted successfully', jobId: req.params.id });
    },

    viewApplyForm: (req, res) => {
        res.render("applyJob", { jobId: req.params.id, userEmail: req.session?.userEmail });
    },

    applyToJob: (req, res) => {
        upload.single('resume')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload error', error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'Resume file is required' });
            }

            const resumePath = req.file.filename; // Store only filename, not full path
            const applicant = { ...req.body, resume: `/files/${resumePath}` };

            jobModel.addApplicant(req.params.id, applicant);
            res.redirect(`/jobs/${req.params.id}`);
        });
    },

    getApplicantsForJob: (req, res) => {
        const applicants = jobModel.getApplicantsForJob(req.params.id);
        res.render("applicants", { applicants, userEmail: req.session?.userEmail });
    }
};

module.exports = jobController;
